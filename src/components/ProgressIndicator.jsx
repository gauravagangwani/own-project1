export default function ProgressIndicator({ count, total }) {
  const complete = count === total
  return <div className="progress-block" aria-label={`${count} of ${total} exhibits restored`}>
    <div className="progress-header"><span>ARCHIVE RECOVERY</span><span>{String(count).padStart(2, '0')} / {String(total).padStart(2, '0')} EXHIBITS RESTORED</span></div>
    <div className="progress-track"><div className="progress-value" style={{ width: `${count / total * 100}%` }} /></div>
    {complete && <p className="unlock-notice">FINAL TRANSMISSION UNLOCKED <span aria-hidden="true">↓</span></p>}
  </div>
}
