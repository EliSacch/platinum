import { rest } from "msw";

const baseURL = "https://platinum-booking-api.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user`, (req,res,ctx) => {
        return res(
            ctx.json({
                "pk":3,
                "username":"Sara",
                "email":"",
                "first_name":"",
                "last_name":"",
                "profile_id":3,
                "profile_image":"https://res.cloudinary.com/dmmlypujq/image/upload/v1/p5/media/../default_profile_dutbfy",
                "profile_name":"",
                "profile_notes":"My sis",
                "is_staff":true
            })
        )
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
        return res(ctx.status(200));
    })
]
