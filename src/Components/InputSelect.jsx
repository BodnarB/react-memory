import React from "react"

export default function InputSelect({handleSelect, difficulty}) {

    return (
        <select value={difficulty} onChange={handleSelect} name="difficulty" id="difficulty">
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
        </select>
    )
}
