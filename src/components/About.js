import React from 'react'

export default function About() {
  return (
    <div className='container'>
      <div className='row'>
        <div class="about-section" style={{ paddingTop: "30px" }}>
          <h4>About iNotebook</h4>
          <p><strong>iNotebook</strong> is a secure and user-friendly React-based application designed to help you manage your notes efficiently. With a focus on simplicity and productivity, iNotebook provides the following core features:</p>

          <h5>Key Features:</h5>
          <ul>
            <li><strong>User Authentication:</strong>
              <ul>
                <li>Secure <strong>Login</strong> and <strong>Sign-Up</strong> functionality.</li>
                <li>Password-protected accounts ensure your notes are safe and accessible only to you.</li>
              </ul>
            </li>
            <li><strong>Add Notes:</strong>
              <ul>
                <li>Create new notes effortlessly with a simple and intuitive interface.</li>
                <li>Each note can include a title and description, making organization easy.</li>
              </ul>
            </li>
            <li><strong>Edit Notes:</strong>
              <ul>
                <li>Update your existing notes whenever needed.</li>
                <li>Instantly modify details to keep your notes accurate and up-to-date.</li>
              </ul>
            </li>
            <li><strong>Delete Notes:</strong>
              <ul>
                <li>Remove unwanted notes with a single click.</li>
                <li>Keep your workspace clutter-free by managing only the notes that matter.</li>
              </ul>
            </li>
          </ul>


        </div>

      </div>

    </div>
  )
}
