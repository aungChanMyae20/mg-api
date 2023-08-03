import styled from 'styled-components'

export const CardFormWrapper = styled.div`
  position: relative;
  background: rgb(188, 214, 205);
  border: 1px solid var(--font-light);
  border-radius: 18px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin: 10px;
  padding: 20px 30px;
`

export const RemoveBtmContainer = styled.div`
  position: absolute;
  top: 3px;
  right: 2px;
  width: 1.8rem;
  height: 1.8rem;
`

export const RemoveBtn = styled.div`
  background: transparent;
  outline: none;
  cursor: pointer;
  font-size: 2rem;
`

export const AddBtnWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: middle;
  padding: 20px;
`

export const AddBtn = styled.button`
  border: 2px dashed var(--font-light);
  text-align: center;
  border-radius: 15px;
  min-width: 240px;
  min-height: 278px;
  background: transparent;
  cursor: pointer;
`

export const CreateBtnWrapper = styled.div`
  display: grid;
  justify-items: center;
`

export const CreateBtn = styled.button`
  cursor: pointer;
  width: 100%;
  border: 0;
  outline: none;
  padding: 20px 30px;
  max-width: 200px;
  border-radius: 15px;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--font-light);
  background-color: var(--secondary-color);
`