import React, { useState, useMemo } from "react"
import jobsData from "./jobs"
import JobCard from "./JobCard"
import "./styles.css"

function App() {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")
  const [sort, setSort] = useState(false)

  const locations = [...new Set(jobsData.map(job => job.location))]
  const types = [...new Set(jobsData.map(job => job.type))]

  const filteredJobs = useMemo(() => {
    let filtered = jobsData.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase())
    )

    if (location) {
      filtered = filtered.filter(job => job.location === location)
    }

    if (type) {
      filtered = filtered.filter(job => job.type === type)
    }

    if (sort) {
      filtered = [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }

    return filtered
  }, [search, location, type, sort])

  return (
    <div className="container">
      <h1>Job Listings</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={location} onChange={e => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="">All Types</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button onClick={() => setSort(prev => !prev)}>
          {sort ? "Clear Sort" : "Sort A-Z"}
        </button>
      </div>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <JobCard key={job.id} job={job} search={search} />
          ))
        ) : (
          <p className="no-results">No jobs found</p>
        )}
      </div>
    </div>
  )
}

export default App
