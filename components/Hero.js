import React from "react";
import Link from 'next/link'

const Hero = ({ categories }) => {
    //console.log("hero",categories)
    return (
      <div className="hero-section">
      <div className="div-block-5"></div>

        <div className="flex-container">
          <div className="hero-text-block">
            <h1 className="hero-h1">Harikuladeler<br/></h1>
            <p className="hero-paragraph">Curated collection of bookmarks includes design, development, marketing, office and no-code web apps and sites.</p>
          </div>
          <div className="div-block-2"></div>
        </div>
        <div className="dropdown-wrapper">
        {categories.map(c => (
            <Link href={`/category/${c.fields.slug}`} key={"nav" + c.fields.slug}>
                <a className="dropdown-link-1 w-inline-block">
                    <div className="icon-wrap-2">
                        <img
                            src={`/images/${c.fields.slug}.png`}
                            alt={`${c.fields.name} icon`}
                            className="icon-5"
                        />
                    </div>
                    <div className="nav-content-wrap">
                        <div className="dropdown-title">
                            {c.fields.title}
                        </div>
                    </div>
                </a>
            </Link>
          ))}
      </div>
    </div>
    )
}

export default Hero;