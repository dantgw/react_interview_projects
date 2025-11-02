import type { FormEvent } from "react";

import "./App.css";

function App() {
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Method 1: Using entries() to get both keys and values
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    // Method 2: Alternative - iterate over keys and get values
    for (const key of formData.keys()) {
      console.log(key, formData.get(key));
    }

    console.log("formData", formData);
    console.log("submitted");
  };
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="checkbox">
          <input name="checkbox" type="checkbox"></input>
          Checkbox
        </label>
        <label htmlFor="color">
          Color:
          <input name="color" type="color"></input>
        </label>

        <label>
          email:
          <input name="email" type="email" />
        </label>

        <label>
          radio
          <input name="radio" type="radio"></input>
        </label>

        <label>
          number
          <input name="number" type="number" />
        </label>
        <label>
          range
          <input name="range" type="range" />
        </label>

        <label>
          date
          <input name="date" type="date" />
        </label>

        <label>
          datetime-local
          <input name="datetime-local" type="datetime-local" />
        </label>

        <label>
          file
          <input type="file" />
        </label>

        <select name="select">
          <option value={"Option 1"}>Option 1</option>
          <option value={"Option 2"}>Option 2</option>
          <option value={"Option 3"}>Option 3</option>
        </select>

        <label>
          url
          <input name="url" type="url"></input>
        </label>

        <button type="submit"></button>
      </form>
    </>
  );
}

export default App;
