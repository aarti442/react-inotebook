import React from 'react'

export default function Alert({ alert }) {
    // Determine the word based on the alert type
    const word = alert?.type === "danger" ? "Error" : "Success";
    console.log(alert)
    return (
      <>
        {/* Render the alert message if it exists */}
        {alert?.msg && (
          <div className={`alert alert-${alert.type}`} role="alert">
            <strong>{word}</strong>: {alert.msg}
          </div>
        )}
      </>
    );
  }