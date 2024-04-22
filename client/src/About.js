const About = () => {
  return (
    <div>
      <div className="bg-dark text-white text-center" style={{ padding: 60 }}>
        <h2>About</h2>
      </div>

      <div className="container-lg d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
        <div className="row">
          <div className="col-5">
            <img src={require("./images/hallway.jpg")} className="d-block w-100" style={{padding: 30}}/>
          </div>
          <div className="col-7" style={{padding: 30}}>
            <h3>Fribley Culinary Critique</h3>
            <p>This web app was made by Benjamin Zheng for CSDS 221 (Full Stack Web Devleopment) at Case Western Reserve University <br/> <br/>This app was made using BootStrap, React, and Mongodb</p>
            <p>April 22, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
