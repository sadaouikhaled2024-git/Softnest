"use client"

import { X } from "lucide-react"

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <X className="close-icon" />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  )
}
