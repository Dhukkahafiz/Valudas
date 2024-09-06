import React from 'react'

function Team() {
  return (
    <>
     <section class="dynamic-team-section">
        {/* <img src="images/Dynamic mid image.png"/> */}
        <img src={require("../../../assets/images/Dynamic mid image.png")} />

        <div class="dynamic-team-section-text">
            <p>OUR STORY</p>
            <h3>A Diverse And Dynamic Team</h3>
            <p>Valuda’s is a melting pot of talent, with team members hailing from diverse cultural and educational
                backgrounds, including computer science grads, software and mechanical engineers. Our experience ranges
                from fresh web developers to seasoned professionals working with giant corporates, delivering complex
                business solutions.</p>
            <br></br>
            <p>Our ability to understand complex problems and convert them into simple, effective solutions sets us
                apart. Our passion for innovation keeps us energized, always ready to tackle new challenges with
                enthusiasm.</p>
        </div>
    </section>

    <div class="dynamic-team-contents">
        <div class="dynamic-team-content">
        <img src={require("../../../assets/images/au-client-logo.png")} />

         
         
            <p>Clients Are Partners</p>
            We Treat Our Clients As Partners, Staying With Them From The Initial Idea Stage Through To Long-Term
            Support.
        </div>
        <div class="dynamic-team-content">
        <img src={require("../../../assets/images/au-team-logo.png")} />

        
            <p>Tech-Focused Teams</p>
            Our Consultants, Designers, Architects, And Engineers Enable Our Customers To Be Competitive And Disruptive
            In The Marketplace.
        </div>
        <div class="dynamic-team-content">
        <img src={require("../../../assets/images/au-focus-logo.png")} />

            
            <p>Focus On Results</p>
            We Have A “No Excuses” Work Culture, Ensuring We Get Things Done Regardless Of The Challenges.
        </div>
    </div>
      
    </>
  )
}

export default Team
