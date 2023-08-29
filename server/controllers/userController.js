const dayjs = require('dayjs')
const UserModel = require('../models/userModel')
const LogModel = require('../models/logModel')
const { serverError } = require('../variables')
const SeasonModel = require('../models/seasonModel')
const AlbumModel = require('../models/albumModel')
const WishlistModel = require('../models/wishlistModel')

const userController = {
  // for development only
  getAllData: async (req, res) => {
    try {
      const data = await UserModel.find()
      res.json(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      res.status(500).json(serverError)
    }
  },
  getProfile: async (req, res) => {
    try {
      const userId = req.user
      const profile = await UserModel.findById(userId)
        .populate([
          {
            path: "friends",
            select: "_id name link"
          },
        ])
        .select("")
        .exec()
        .then(async (user) => {
          const populatedUser = user.toObject()
          const { pin, notifications, cards: userCards, ...rest } = populatedUser

          const notificationsDetail = []

          const notificationPromises = notifications.map(async (noti) => {
            const detail = await LogModel.findById(noti.logId)
            notificationsDetail.push({
              log: detail,
              viewed: noti.viewed
            })
          })

          const latestSeason = await SeasonModel.findOne().sort({ endDate: -1 })
          const allAlbums = await AlbumModel.find({ seasonID: latestSeason._id })
            .populate("cards")
          const userWishlist = await WishlistModel.findOne({ userID: userId })
            .populate("cards") | []
          
          const userWishlistCardsIds = []
          
          if (userWishlist) {
            const userWishlistObj = userWishlist.toObject()
            userWishlistObj.cards.map((card) => userWishlistCardsIds.push(card._id))
          }
          


          const userAlbums = []
          await allAlbums.map((album) => {
            const albumObj = album.toObject()
            const cards = []
            albumObj.cards.map((card) => {
              const cardUserHave = userCards.filter(item => item.cardId.toString() === card._id.toString())[0]
              if (cardUserHave) {
                cards.push({
                  ...card,
                  ...cardUserHave,
                  isInWishlist: userWishlistCardsIds.includes(card._id)
                })
              } else {
                cards.push({
                  ...card,
                  count: 0,
                  isInWishlist: false
                })
              }
            })

            userAlbums.push({
              ...albumObj,
              cards
            })
          })

          await Promise.all(notificationPromises)
          return {
            ...rest,
            notifications: notificationsDetail,
            cards: {
              season: latestSeason,
              albums: userAlbums
            },
            wishlist: userWishlist
          }
        })

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }


      
      return res.json({
        success: true,
        message: "User found",
        data: profile
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      res.status(500).json(serverError)
    }
  },
  getUserByUser: async (req, res) => {
    try {
      const { userId } = req.params
      const reqUserId = req.user

      const isUser = await UserModel.findById(userId)
      if (!isUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      if (userId === reqUserId) {
        const user = await UserModel.findById(userId)
        .populate([
          "cards",
          "friends",
          "groups",
          "membership",
        ])
        .exec()
        .then(async (user) => {
          const populatedUser = user.toObject()
          const { pin, friends, notifications, ...rest } = populatedUser
          const friendsList = populatedUser.friends.map((friend) => {
            const { _id, name, link } = friend
            return {
              _id,
              name,
              link
            }
          })

          const notificationsDetail = []

          const promises = notifications.map(async (noti) => {
            const detail = await LogModel.findById(noti.logId)
            notificationsDetail.push({
              log: detail,
              viewed: noti.viewed
            })
          })

          await Promise.all(promises)
          return {
            ...rest,
            friends: friendsList,
            notifications: notificationsDetail
          }
        })
        return res.json({
          success: true,
          message: 'User found',
          data: user
        })
      }

      const { cards, pin, friends, groups, notifications, ...rest } = isUser.toObject()

      return res.json({
        success: true,
        message: 'User found',
        data: rest
      })
    } catch (error) {
      console.error('Error getting user:', error)
      res.status(500).json(serverError)
    }
  },
  addNewUser: async (req, res) => {
    try {

      const { name, pin, role = 'user', ...rest } = req.body;

      const newUser = new UserModel({
        name,
        pin,
        role,
        joinedDate: dayjs(),
        ...rest
      })
      const savedUser = await newUser.save()

      return res.status(201).json({ 
        success: true,
        message: 'User created',
        data: savedUser
      })
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
        return res.status(400).json({ error: 'Name already exists' })
      }
      console.error('Error creating user:', error)
      res.status(500).json(serverError)
    }
  },
  sendFriendRequest: async (req, res) => {
    try {
      const reqUserId = req.user
      const { targetId } = req.params
      const user = await UserModel.findById(reqUserId)
      const targetUser = await UserModel.findById(targetId)

      if (!user || !targetUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        })
      }

      const logData = new LogModel({
        subject: {
          id: reqUserId,
          name: user.name
        },
        action: 'request',
        target: {
          id: targetId,
          name: targetUser.name
        },
        category: 'User',
        dateTime: dayjs()
      })
      const savedLog = await logData.save()

      targetUser.notifications.push({
        logId: savedLog._id,
        viewed: false
      })

      user.requests.friends.push(targetUser._id)

      await targetUser.save()

      return res.json({
        success: true,
        message: 'Friend request sent',
        data: {
          log: savedLog.id
        }
      })
    } catch (error) {
      console.error('Error sending friend request:', error)
      res.status(500).json(serverError)
    }
  },
  respondFriendRequest: async (req, res) => {
    try {
      const { logId, status } = req.params

      const targetLog = await LogModel.findById(logId)

      if (targetLog) {
        const user = await UserModel.findById(targetLog.target.id)
        const targetUser = await UserModel.findById(targetLog.subject.id)

        if (!user || !targetUser) {
          return res.status(404).json({
            success: false,
            message: 'Message not found'
          })
        }
  
        const accepted = status === 'accepted'
  
        if (accepted) {
          user.friends.push(targetUser._id)
          targetUser.friends.push(user._id)
          
          const acceptLog = new LogModel({
            subject: {
              id: user._id,
              name: user.name
            },
            action: "accepted",
            target: {
              id: targetUser._id,
              name: targetUser.name
            },
            category: "User",
            dateTime: dayjs()
          })
          const savedLog = await acceptLog.save()
          targetUser.notifications.push({
            logId: savedLog._id,
            viewed: false
          })
        }
        const targetNotification = user.notifications.find(obj => obj.logId.toString() === logId)
        const targetIndex = user.notifications.findIndex(obj => obj.logId.toString() === logId)

        user.notifications[targetIndex] = {
          logId: targetNotification.logId,
          viewed: true
        }

        await user.save()
        await targetUser.save()

        return res.json({
          success: true,
          message: 'Friend request responded',
        })
      }
      return res.status(500).json({
        success: true,
        message: 'Unexpected error'
      })
    } catch (error) {
      console.error('Error responding friend request', error)
      res.status(500).json(serverError)
    }
  },
  respondNotification: async (req, res) => {
    try {
      const { logId } = req.params
      const userId = req.user

      const user = await UserModel.findById(userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }
      const targetNotification = user.notifications.find(obj => obj.logId.toString() === logId)
      const targetIndex = user.notification.findIndex(obj => obj.logId.toString() === logId)
      user.notifications[targetIndex] = { ...targetNotification, viewed: true }
      await user.save()
      return res.json({
        success: true,
        message: 'Notification updated'
      })
    } catch (error) {
      console.error('Error updating notification:', error)
      res.status(500).json(serverError)
    }
  },
  removeFriend: async (req, res) => {
    try {
      const { targetId } = req.params
      const userId = req.user
      const target = await UserModel.findById(targetId)
      const user = await UserModel.findById(userId)
      if (!target || !user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        })
      }

      target.friends.pull(userId)
      user.friends.pull(targetId)
      
      target.save()
      user.save()

      return res.json({
        success: true,
        message: 'Friend successfully removed'
      })
    } catch (error) {
      console.error('Error removing friend:', error)
      res.status(500).json(serverError)
    }
  },
  // User card count update
  updateCardCount: async (req, res) => {
    try {
      const userId = req.user
      const { albumTag, cardId } = req.params
      const { count } = req.body

      const user = await UserModel.findById(userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        })
      }

      const { cards } = user

      const targetCard = cards.filter((card) => card.cardId.toString() === cardId)[0]
      if (targetCard) {
        const targetCardIndex = cards.indexOf((card) => card.cardId.toString() === cardId)
        const newCard = { ...targetCard, count }
        user.cards[targetCardIndex] = newCard
        
      } else {
        const newCard = {
          cardId,
          count,
          addedToWishlist: false
        }
        user.cards.push(newCard)
      }
      const savedUser = await user.save()
      
      if (savedUser) {
        const wishlist = await WishlistModel.findOne({ userID: userId })
        if (count > 0 && wishlist?.cards.includes(cardId)) {
          wishlist.cards.pull(cardId)
          await wishlist.save()
        }

        return res.json({
          success: true,
          message: 'Card successfully updated',
          data: {
            albumTag,
            cardId,
            count
          }
        })
      }
      return res.status(500).json(serverError)
    } catch (error) {
      console.error('Error updating card count:', error)
      res.status(500).json(serverError)
    }
  }
}

module.exports = userController