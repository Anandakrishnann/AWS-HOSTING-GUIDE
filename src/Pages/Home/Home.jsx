"use client"

import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./Home.css"

const Home = () => {
  const navigate = useNavigate()
  const [subText, setSubText] = useState("")
  const fullText = "HEERE IS THE FULL GUIDE TO HOST YOUR DJANGO PROJECT IN AWS"
  const particlesRef = useRef(null)

  useEffect(() => {
    let i = 0
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setSubText((prev) => prev + fullText.charAt(i))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, 50)

    return () => clearInterval(typingEffect)
  }, [])

  useEffect(() => {
    const particles = particlesRef.current
    const ctx = particles.getContext("2d")
    let animationFrameId

    particles.width = window.innerWidth
    particles.height = window.innerHeight

    const particlesArray = []
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * particles.width
        this.y = Math.random() * particles.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) this.size -= 0.1
      }
      draw() {
        ctx.fillStyle = "rgba(173, 216, 230, 0.8)"
        ctx.strokeStyle = "rgba(173, 216, 230, 0.8)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }
    }

    function init() {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, particles.width, particles.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const description = () => {
    navigate("/description")
  }
  const instruction = () => {
    navigate("/guide")
  }

  return (
    <div className="container">
      <canvas ref={particlesRef} className="particles"></canvas>
      <div className="content">
        <h1 className="glitch" data-text="🚀 WELCOME DJANGO DEVELOPERS 🚀">
          🚀 WELCOME DJANGO DEVELOPERS 🚀
        </h1>
        <h2 className="subtext">{subText}</h2>
        <button onClick={description} className="cta-button">
          <span>Description</span>
        </button>
        <button onClick={instruction} className="cta-button">
          <span>Instructions</span>
        </button>
      </div>
    </div>
  )
}

export default Home