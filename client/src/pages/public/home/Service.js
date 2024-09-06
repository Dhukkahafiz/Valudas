import React from 'react';

function Service() {
    return (
        <section class="service-section">
            <div class="section-header">
                <div class="text-head">
                    <p>EMPOWERING GROWTH, FUELLING INNOVATION</p>
                </div>
                <h2><span id="border-header-text">Services</span>: Transformative Web & Mobile Solutions</h2>
                <p> Valuda’s Offers Premier Web & Mobile Development Services, Turning Your App Visions Into Realities.
                    We're More Than Exceptional Developers; We're Strategic Partners Guiding Your Business Towards Success.
                </p>
            </div>
            <div class="service-items">

                <div class="service-items-content">

                    <div class="website-development-content">
                        <i class="fa-solid fa-code"></i>
                        <div class="website-development-inner-text">
                            <p>YOUR DIGITAL PRESENCE, PERFECTED</p>
                            <h3>Website Development</h3>
                        </div>
                    </div>

                    <div class="mobile-app-development-content">
                        <i class="fa-solid fa-mobile-button"></i>
                        <div class="website-development-inner-text">
                            <p>INNOVATIVE SOLUTIONS FOR EVERY INDUSTRY</p>
                            <h3>Mobile App Development</h3>
                        </div>
                    </div>

                    <div class="front-end-development-content">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                        <div class="website-development-inner-text">
                            <p>CRAFTING ENGAGING USER EXPERIENCES</p>
                            <h3>Front-End-Development</h3>
                        </div>
                    </div>

                </div>

                <div class="service-item-inner-content">
                    <img src={require("../../../assets/images/service-image.png")}/>
                </div>
            </div>
        </section>
    );
}

export default Service;
