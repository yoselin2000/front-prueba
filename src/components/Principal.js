import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

export const Principal = () => {


  return (
    <div className="text-black">
    <center>
    <Carousel>
            <Carousel.Item >
                <img
                    className="d-block w-90"
                    src="https://www.agrecolandes.org/wp-content/uploads/2019/02/parcela-4.png"
                    alt="First slide"
                />
                <Carousel.Caption >
                    {/* <h3 className="text-white">QUIENES SOMOS</h3> */}
                    {/* <p>{nosotros["quienes somos"][0]}</p> */}
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-90"
                    src="https://encuentro.migracionescomunicativas.cl/wp-content/uploads/plantas-medicinales-colitis.jpg"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    {/* <h3 className="text-white">MISIÓN</h3> */}
                    {/* <p>{nosotros["misión"][0]}</p> */}
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-90"
                    src="https://www.agrecolandes.org/wp-content/uploads/2021/04/49643267_539875796529951_695976850198888448_n.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    {/* <h3 className="text-white">VISIÓN</h3> */}
                    {/* <p>{nosotros["visión"][0]}</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </center>

  </div>
  );
};

