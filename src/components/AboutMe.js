import React from 'react';
import '../styles/AboutMe.css';

const AboutMe = () => {
    return (
        <div className="window about-me-window">
            <div className="window-content">
                <h2>Otoni Richard</h2>
                <img src="/images/Foto2.png" alt="Richard Picture" className="about-image" />
                <p>
                    I am a Brazilian student currently pursuing a double major in
                    Computer Science and Economics at UNC Chapel Hill.
                    My passion for technology began at the start of high school, during the pandemic,
                    when I started learning to program and build websites. This interest led me to
                    join my school's robotics team in 2022 and 2023, where we developed a line-following robot
                    and competed in the Brazilian Robotics Olympiad (OBR). Our team won regional, state, and
                    national titles in the Best Programming category.
                </p>
                <img src="/images/foto1.png" alt="Richard Picture" className="about-image2" />
                <img src="/images/robotica.png" alt="Robotics Team" className="about-image3" />

                <p>
                    Beyond robotics, I have participated in several state and national programming and math competitions.
                    In 2023, I was selected by a company among 20 students from São Paulo to receive a full scholarship
                    covering all expenses for four years of college in the United States.
                </p>
                <p>
                    I am eager to apply my knowledge and skills in technology to real-world challenges.
                    I am looking for opportunities where I can contribute, grow, and continue learning in the field.
                    I am particularly interested in web development, software engineering, and data science.
                </p>
            </div>
        </div>
    );
};

export default AboutMe;
