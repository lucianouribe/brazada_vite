export default function PricingCard({ description, price, quantity }) {
  return (
    <article className="pricing-card" aria-label={quantity}>
      <p className="pricing-card-price">{price}</p>
      <h3>{quantity}</h3>
      <p className="pricing-card-description">{description}</p>
    </article>
  )
}
