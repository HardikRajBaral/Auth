import type { ReactNode } from 'react'

type AuthLayoutProps = {
  title: string
  description: string
  eyebrow: string
  points: Array<{
    title: string
    text: string
  }>
  children: ReactNode
}

const AuthLayout = ({ title, description, eyebrow, points, children }: AuthLayoutProps) => {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-intro">
          <div className="auth-brand">
            <span className="auth-brand-dot" />
            Secure access
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="auth-points">
            <div className="auth-kicker">{eyebrow}</div>
            {points.map((point) => (
              <div className="auth-point" key={point.title}>
                <strong>{point.title}</strong>
                <span>{point.text}</span>
              </div>
            ))}
          </div>
        </aside>
        <section className="auth-card">{children}</section>
      </section>
    </main>
  )
}

export default AuthLayout