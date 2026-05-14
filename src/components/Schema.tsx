export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Connecx",
    "image": "https://connecx.com.br/og-image.png",
    "@id": "https://connecx.com.br",
    "url": "https://connecx.com.br",
    "telephone": "+5513900000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "Guarujá",
      "addressRegion": "SP",
      "postalCode": "",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.9935,
      "longitude": -46.2562
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/connecx"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
