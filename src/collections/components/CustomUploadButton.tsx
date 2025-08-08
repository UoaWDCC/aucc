'use client'

import React from 'react'
import type { ListViewClientProps } from 'payload'

// Experimental file for bulk creating items in the gallery, not done, doesnt work, not used

function CustomUpload() {
  return <div>Custom Upload Component</div>
}

export default function CustomUploadButton(props: ListViewClientProps) {
  console.log(props)
  return (
    // <button
    //   type="button"
    //   aria-label="Bulk Upload"
    //   class="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
    // >
    //   <span class="btn__content">
    //     <span class="btn__label">Bulk Upload</span>
    //   </span>
    // </button>
    <>
      <div hidden id="yes" className="absolute h-full">
        <div className="bulk-upload--add-files">
          <div className="bulk-upload--drawer-header">
            <h2 title="Add files">Add files</h2>
            <button
              aria-label="Close"
              className="drawer-close-button"
              type="button"
            >
              <svg
                className="icon icon--x"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="stroke"
                  d="M14 6L6 14M6 6L14 14"
                  strokeLinecap="square"
                ></path>
              </svg>
            </button>
          </div>
          <div className="bulk-upload--add-files__dropArea">
            <div className="dropzone dropzoneStyle--default">
              <button
                type="button"
                className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup"
              >
                <span className="btn__content">
                  <span className="btn__label">Select a file</span>
                </span>
              </button>
              <input
                aria-hidden="true"
                className="bulk-upload--add-files__hidden-input"
                hidden
                multiple
                type="file"
              />
              <p className="bulk-upload--add-files__dragAndDropText">
                Or Drag and drop a file
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill"
        onClick={() => {
          document.getElementById('yes')!.toggleAttribute('hidden')
        }}
      >
        <span className="btn__content">
          <span className="btn__label">Bulk Upload</span>
        </span>
      </button>
    </>
  )
}
