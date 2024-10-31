export default function Hr ({ className } : { className?: string }) {
    return (
        <div className={`border-b border-gray-2 ${className}`}/>
    )
}