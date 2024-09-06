import React from 'react'

const Portfolio = () => {
    return (
        <>
            <section class="our-work-section">
                <div class="section-header">
                    <div class="text-head">
                        <p>TRANSFORMING IDEAS INTO REALITY</p>
                    </div>
                    <h2><span id="border-header-text">Our Work</span>: Showcasing Excellence</h2>
                    <p> Experience The Satisfaction Of Our Clients Firsthand. With 100% Of Them Awarding Us Five Star Ratings On
                        Google And Every Online Platform, Our Track Record Speaks Volumes About Our Commitment To Excellence.
                    </p>
                </div>

                <div class="our-work-content">

                    <div class="our-work-content-text">
                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <img src={require("../../../assets/images/CMS logo.png")} alt="CMS Logo" />
                                    <div class="cms-content-head-text-icon">
                                        <p>CMS</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>

                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <img src={require("../../../assets/images/vs studio logo.png")} alt="CMS Logo" />
                                    <div class="cms-content-head-text-icon">
                                        <p>Custom Web Development</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>


                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <img src={require("../../../assets/images/Hubspot logo.png")} alt="CMS Logo" />
                                    <div class="cms-content-head-text-icon">
                                        <p>HubSpot Development</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>


                        <div class="cms-content">
                            <details class="cms-details">
                                <summary class="cms-content-header">
                                    <i class="fa-brands fa-android" style={{ color: "#05f649" }}></i>
                                    <div class="cms-content-head-text-icon">
                                        <p>Mobile Application</p>
                                        <i class="fa-solid fa-angle-up"></i>
                                    </div>
                                </summary>

                                <div class="cms-content-dropdown-text">
                                    <span class="green-text">
                                        <p>Hubspot CMS</p>
                                        <i class="fa-solid fa-arrow-right" style={{ color: " #52a01f" }}></i>
                                    </span>
                                    <p>Wordpress</p>
                                    <p>OpenCart</p>
                                </div>
                            </details>
                        </div>





                        {/*
                            
                        <div class="custom-web-dev-section">
                            <div class="custom-web-dev-section-inner-text">
                                <img src={require("../../../assets/images/vs studio logo.png")} />
                                <p>Custom Web Development</p>
                            </div>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>

                        <div class="custom-web-dev-section">
                            <div class="custom-web-dev-section-inner-text">
                                <img src={require("../../../assets/images/Hubspot logo.png")} />
                                <p>HubSpot Development</p>
                            </div>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>

                        <div class="custom-web-dev-section">
                            <div class="custom-web-dev-section-inner-text">
                                <i class="fa-brands fa-android" style={{ color: "#05f649" }}></i>
                                <p>Mobile Application</p>
                            </div>
                            <i class="fa-solid fa-angle-down"></i>
                        </div>
 */}
                    </div>

                    <div class="our-work-content-slider">
                        <div class="slider-content1">
                            <img src={require("../../../assets/images/slider-image1.png")} />
                            <h4>Proud Punch</h4>
                            <p>Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development
                                And Developing New Leaders.</p>
                        </div>
                        <div class="slider-content2">
                            <img src={require("../../../assets/images/slider-image2.png")} />
                            <h4>WeedMat</h4>
                            {/*
                                    <p>Insight Experience Offers A Suite Of Experiential Business Simulation And Leadership Development
                                    And Developing New Leaders.</p> 
                                    */}
                        </div>
                    </div>
                </div >

                <div class="inquiry-section">
                    <h5>Get Excellent Service And Support And Grow Your Business Online With Valuda’s</h5>
                    <button class="inquiry-button">Inquiry Now</button>
                </div>

            </section >
        </>
    )
}

export default Portfolio

