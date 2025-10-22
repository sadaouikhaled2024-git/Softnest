import "./Card.css"

const CardFooter = ({ children, className = "" }) => {
  return <div className={`card-footer ${className}`}>{children}</div>
}

export default CardFooter

