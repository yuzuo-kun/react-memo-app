import React, { useState } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd';

function MemoList({ memos, deleteMemo, editMemo, searchText, selectedTag }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editTag, setEditTag] = useState("");

  const handleEditTag = (id, text, tag) => {
    setEditingId(id);
    setEditText(text);
    setEditTag(tag);
  };

  const handleSaveClick = (id) => {
    editMemo(id, editText, editTag);
    setEditingId(null);
  };

  const filteredMemos = memos.filter((memo) =>
    memo.text.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedTag === "" || memo.tag.toLowerCase() === selectedTag.toLowerCase())
  );

  return (
    <Droppable droppableId='momos'>
      {(provided) => (
        <ul className='memo-list' {...provided.droppableProps} ref={provided.innerRef}>
          {filteredMemos.map((memo, index) => (
            <Draggable key={memo.id} draggableId={memo.id} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className='memo-item'
                >
                  {editingId === memo.id ? (
                    <>
                      <input
                        type='text'
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder='メモ'
                      />
                      <input
                        type='text'
                        value={editTag}
                        onChange={(e) => setEditTag(e.target.value)}
                        placeholder='タグ'
                      />
                      <button onClick={() => handleSaveClick(memo.id)}>保存</button>
                    </>
                  ) : (
                    <>
                      <span onClick={() => handleEditTag(memo.id, memo.text, memo.tag)}>
                        {memo.text} <span className='tag'>{memo.tag}</span>
                      </span>
                      <button onClick={() => { deleteMemo(memo.id) }}>削除</button>
                    </>
                  )}
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default MemoList