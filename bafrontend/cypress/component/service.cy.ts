import { getPickups } from "utils/pickupRequest/pickupRequest.service"



describe('<Page />', () => {
    it('should render and display expected content', () => {

        cy.visit("http://localhost:4000/")
      // Mount the React component for the Home page
        let pickups = getPickups(1,1111111111)
        console.log(pickups)
    })
  })