import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import Navigation from "../Navigation";

test("renders Navigation", () => {
    render(
        <Router>
            <Navigation />
        </Router>
    );

    const signInLink = screen.getByRole("link", { name: "Sign in" });
    const signUpLink = screen.getByRole("link", { name: "Sign up" });

    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
});

test("renders link to the user profile for a logged in user", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <Navigation />
            </CurrentUserProvider>
        </Router>
    );

    const profileLink = await screen.findByText("Profile");
    const button = await screen.findByRole('button', { name: 'Sing out' })
    expect(button).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
});
