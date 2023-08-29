import styled from 'styled-components'

export const DatepickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  label {
    margin: 0;
    margin-bottom: 5px;
    font-size: 1rem;
  }

  input {
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid var(--font-light);
    outline: none;
    background: rgb(216, 230, 224);
  }

  p {
    margin: 0;
    color: var(--primary-color);
  }
`