import Movies from "./Movies"
import Navigation from "./Navigation";
import { Container } from "react-bootstrap";


export const Home = () => {
    const username: any = localStorage.getItem('username')


    return (
        <div>
            <Navigation />
            <Container>        
                <Movies />
            </Container>

        </div>
    );
}

export default Home;


