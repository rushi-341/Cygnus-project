import React from "react"

const highlightText = (text, keyword) => {
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, "gi")
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={index} className="highlight">{part}</span>
    ) : (
      part
    )
  )
}

const JobCard = ({ job, search }) => {
  return (
    <div className="job-card">
      <h3>{highlightText(job.title, search)}</h3>
      <p className="company">{job.company}</p>
      <div className="meta">
        <span>{job.location}</span>
        <span className={`tag ${job.type === "Full-time" ? "full" : "intern"}`}>
          {job.type}
        </span>
      </div>
    </div>
  )
}

export default JobCard
