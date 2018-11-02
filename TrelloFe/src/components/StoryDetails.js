import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose, withStateHandlers } from 'recompose'
import Selector from './Selector'
import AddComment from './AddComment'

const StoryDetails = ({
  id,
  title,
  label,
  comment,
  onChange,
  userName,
  newStory,
  comments,
  assigned,
  labelName,
  onEditStory,
  handleClose,
  description,
  onAddComment,
  onDeleteStory,
  onCreateStory,
  onChangeComment,
  onDeleteComment,
  onChangeToEditComment,
  onChangeLabelAssigned,
}) => {
  return (
    <Container>
      <Content>
        <Icon>
          <FontAwesomeIcon icon="times" color="#818284" onClick={handleClose} />
        </Icon>

        <Label>
          <LabelTitle>
            <div>Title:</div>
          </LabelTitle>
          <div>
            <Input
              type="text"
              title="title"
              name="title"
              value={title}
              onChange={onChange}
            />
          </div>
        </Label>

        <Selector
          name="label"
          value={label}
          title="label"
          onChange={onChange}
          labelObj={labelName}
        />
        <Selector
          name="assigned"
          title="assigned"
          value={assigned}
          onChange={onChange}
          labelObj={userName}
        />

        <Label>
          <LabelTitle>
            <div>Description:</div>
          </LabelTitle>
          <InputDescription
            type="text"
            title="description"
            name="description"
            value={description}
            onChange={onChange}
          />
        </Label>

        {newStory ? (
          <SubmitButton
            type="submit"
            value="Add story"
            onClick={onCreateStory}
          />
        ) : (
          <div>
            <RowElement>
              <AddCommentBox>
                <Label>
                  <LabelTitle>Add comment:</LabelTitle>
                </Label>
                <AddComment
                  comment={comment}
                  userName={userName}
                  onChangeComment={onChangeComment}
                />
              </AddCommentBox>
              <SubmitButton
                type="submit"
                value="Add comment"
                onClick={onAddComment}
              />
            </RowElement>

            <RowElement>
              <AddCommentBox>
                {comments.length ? (
                  <div>
                    <Label>
                      <LabelTitle>Comments :</LabelTitle>
                    </Label>
                    {comments.map((comment, index) => (
                      <Label key={index}>
                        <LabelTitleComment key={index}>
                          {comment.name}
                        </LabelTitleComment>
                        <InputComment
                          title={'text'}
                          value={comment.text}
                          id={comment._id}
                          onChange={onChangeToEditComment}
                        />
                        <Icon>
                          <FontAwesomeIcon
                            icon="trash"
                            color="#818284"
                            onClick={() => onDeleteComment(comment._id)}
                          />
                        </Icon>
                      </Label>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </AddCommentBox>
            </RowElement>

            <SubmitButton
              type="submit"
              value="Edit story"
              onClick={onEditStory}
            />
            <SubmitButton
              type="submit"
              value="Delete story"
              onClick={onDeleteStory}
            />
          </div>
        )}
      </Content>
    </Container>
  )
}

const enhance = compose(
  withStateHandlers(
    ({
      id = '',
      title = '',
      label = 'To Do',
      assigned = 'Nobody',
      description = '',
      comments = [],
      comment = { name: 'Nobody', text: '' },
    }) => ({
      id,
      title,
      label,
      comment,
      comments,
      assigned,
      description,
    }),
    {
      onChange: (state, props) => event => ({
        [event.target.title]: event.target.value,
      }),
      onChangeComment: (state, props) => event => {
        let newComment = state.comment
        newComment[event.target.title] = event.target.value
        return { comment: newComment }
      },
      onCreateStory: (state, props) => event => {
        const { comment, comments, id, ...rest } = state
        props.handleClose()
        fetch('stories/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rest),
        })
      },
      onEditStory: (state, props) => event => {
        const { comment, comments, id, ...rest } = state
        props.handleClose()
        fetch('stories/' + props.id, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rest),
        })
      },
      onDeleteStory: (state, props) => event => {
        props.handleClose()
        fetch('stories/' + props.id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      },
      onAddCommentToState: (state, props) => event => {
        let updateComments = state.comments
        updateComments.push(state.comment)
        return { comments: updateComments }
      },
      onAddComment: (state, props) => event => {
        fetch('stories/' + props.id + '/comments', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.comment),
        })
      },
      onDeleteComment: (state, props) => id => {
        fetch('stories/' + props.id + '/comments/' + id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      },
      onChangeToEditComment: (state, props) => event => {
        const id = event.target.id
        return {
          ...state,
          comments: state.comments.map(
            comment =>
              comment._id === id
                ? {
                    ...comment,
                    text: event.target.value,
                  }
                : comment,
          ),
        }
      },
    },
  ),
)

export default enhance(StoryDetails)

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`
const Content = styled.div`
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
  border-radius: 8px;
`
const RowElement = styled.div`
  margin: 2em 0em;
`
const AddCommentBox = styled.div`
  margin: 0% auto;
`
const Icon = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Label = styled.div`
  margin: 4% 15%;
`
const LabelTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1% 0%;
  color: #472f6b;
  font-size: 1.2em;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
`
const LabelTitleComment = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1% 0%;
  color: #472f6b;
  font-size: 1em;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
`

const Input = styled.input`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.9em;
  outline: none;
  margin-left: 1%;
  width: 100%;
  ::placeholder {
    padding-left: 1%;
  }
  border-style: solid;
  border-color: #472f6b;
  border-radius: 8px;
  border-width: 1px;
  padding-left: 60px;
  padding: 0.5em;
`
const InputDescription = styled.textarea`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.9em;
  outline: none;
  margin-left: 1%;
  width: 100%;
  ::placeholder {
    padding-left: 1%;
  }
  border-style: solid;
  border-color: #472f6b;
  border-radius: 8px;
  border-width: 1px;
  padding-left: 60px;
  padding: 0.5em;
  height: 5em;
`
const InputComment = styled.textarea`
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.9em;
  outline: none;
  margin-left: 1%;
  width: 100%;
  ::placeholder {
    padding-left: 1%;
  }
  border-style: solid;
  border-color: #472f6b;
  border-radius: 8px;
  border-width: 1px;
  padding-left: 60px;
  padding: 0.5em 0.5em;
  height: 2.1em;
`

const SubmitButton = styled.input`
  background: #472f6b;
  color: white;
  padding: 5px 10px;
  margin: 0em 2em;
  outline: none;
  border-radius: 15px;
  font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
  font-size: 0.8em;
  &:hover {
    border: 1px solid #0099cc;
    background-color: #472f6b;
    color: white;
    padding: 5px 10px;
  }
`
