import React, { useState } from 'react'

function MemoInput({ addMemo, tags }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addMemo(text, tag);
    setText("");
    setTag("");
  };

  return (
    <form onSubmit={handleSubmit} className='memo-input'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='メモを入力...'
      />
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option value="">タグを選択</option>
        {tags.map((tagOption) => (
          <option key={tagOption} value={tagOption}>
            {tagOption}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='新しいタグを追加...'
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <button type='submit'>追加</button>
    </form>
  )
}

export default MemoInput