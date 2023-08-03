const GroupModel = require('../models/groupModel')
const UserModel = require('../models/userModel')

const groupController = {
  getAllGroups: async (req, res) => {
    try {
      const data = await GroupModel.find()
      const dataToRespond = {
        groups: data,
        total: data.length
      }
      res.json({
        success: true,
        message: data.length > 0 ? `${data.length} group${data.length > 1 ? 's' : ''} found` : 'No group found',
        data: dataToRespond
      })
    } catch (error) {
      console.error('Error fetching groups:', error)
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  },
  getOne: async (req, res) => {
    try {
      const { groupId } = req.params

      const group = await GroupModel.findById(groupId)
      if (!group) {
        res.status(404).json({
          success: false,
          message: 'No group found'
        })
      }
      res.json({
        success: true,
        message: `Group found: ${group.name}`,
        data: group
      })
    } catch (error) {
      console.error('Error fetching group:', error)
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  },
  createGroup: async (req, res) => {
    try {
      const { owner, name } = req.body
      const groupOwner = await UserModel.findOne({ _id: owner })
      if (!groupOwner) {
        res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
      
      const group = new GroupModel({
        name,
        owner,
        members: [owner]
      })

      const savedGroup = await group.save()
      
      const userGroups = groupOwner.groups
      const userMembership = groupOwner.membership

      groupOwner.groups = [ ...userGroups, savedGroup._id ]
      groupOwner.membership = [ ...userMembership, savedGroup._id ]

      await groupOwner.save()

      res.json({
        success: true,
        message: `Album created: ${name}`,
        data: savedGroup
      })
    } catch (error) {
      console.error("Error creating group:", error)
      res.status(500).json({
        success: false,
        message: 'Error creating group',
      })
    }
  },
  updateGroup: async (req, res) => {
    try {
      const { groupId } = req.params
      const data = req.body

      const group = await GroupModel.findById(groupId)
      if (!group) {
        res.status(404).json({
          success: false,
          message: 'No group found'
        })
      }
      const updatedGroup = await GroupModel.findByIdAndUpdate(groupId, { ...data })
      res.json({
        success: true,
        message: `Group updated: ${data.name}`,
        data: updatedGroup
      })
    } catch (error) {
      console.error('Error updating groups:', error)
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  },
  updateMembers: async (req, res) => {
    try {
      const { groupId } = req.params
      const members = req.body

      const group = await GroupModel.findById(groupId)
      if (!group) {
        res.status(404).json({
          success: false,
          message: 'No group found'
        })
      }

      const groupMembers = group.members.map(gMember => gMember._id)

      group.members = [ ...groupMembers, ...members]
      const savedGroup = await group.save()

      for (const item of members ) {
        const member = await UserModel.findById(item)
        if (member) {
          const membership = member.membership
          member.membership = [ ...membership, groupId ]
          await member.save()
        }
      }

      res.json({
        success: true,
        message: 'Members updated',
        data: savedGroup
      })
    }catch (error) {
      console.error('Error updating members:', error)
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  },
  deleteGroup: async (req, res) => {
    try {
      const { groupId } = req.params

      const group = await GroupModel.findById(groupId)
      
      if (!group) {
        res.status(404).json({
          success: false,
          message: 'No group found'
        })
      }

      const usersWithGroup = await UserModel.find({
        $or: [
          { groups: groupId },
          { membership: groupId }
        ]
      })

      const promises = usersWithGroup.map( async (user) => {
        if (user.groups.includes(groupId)) {
          user.groups.pull(groupId)
        }
        if (user.membership.includes(groupId)) {
          user.membership.pull(groupId)
        }
        await user.save()
      })

      await Promise.all(promises)

      await group.deleteOne({ _id: groupId })

      res.json({
        success: true,
        message: 'Group successfully removed'
      })
    } catch (error) {
      console.error('Error removing groups:', error)
      res.status(500).json({
        success: false,
        message: 'Server error'
      })
    }
  }
}

module.exports = groupController