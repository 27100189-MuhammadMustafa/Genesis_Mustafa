const {check, validationResult} = require('express-validator');
const User = require('../model/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req,res,next) => {
    res.render("login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: [],
        oldInput: {email: ""},
        user: {},
    });
};

exports.getSignup = (req,res,next) => {
    res.render("signup", {
        pageTitle: "Signup",
        currentPage: "signup",
        isLoggedIn: false,
        errors: [],
        oldInput: {firstName: "", lastName: "", email: ""},
        user: {},
    });
};

exports.postSignup = [
    check("firstName")
    .trim()
    .isLength({min: 3})
    .withMessage("First name must be at least 3 characters long")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First name must contain only capital letters"),

    check("lastName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last Name should contain only alphabets"),

    check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

    check("password")
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number"),

    check("confirmPassword")
    .trim()
    .custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error("Passwords have to match!");
        }
        return true;
    }),
    (req,res,next) => {
        const {firstName, lastName, email, password} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render("signup", {
                pageTitle: "Signup",
                currentPage: "signup",
                isLoggedIn: false,
                errors: errors.array().map(err => err.msg),
                oldInput: {firstName, lastName, email, password},
                user: {}
            })
        }

        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
            return user.save()
        })
        .then(() => {
            res.redirect("/login");
        }).catch(err => {
            return res.status(422).render("signup", {
                pageTitle: "Signup",
                currentPage: "signup",
                isLoggedIn: false,
                errors: [err.message],
                oldInput: {firstName, lastName, email},
                user: {},
            });
        });
    }
]

exports.postLogin = async (req,res,next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(422).render("login", {
            pageTitle: "Login",
            currentPage: "login",
            isLoggedIn: false,
            errors:["User does not exist"],
            oldInput: {email: email},
            user: {},
        });
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(422).render("login", {
            pageTitle: "Login",
            currentPage: "login",
            isLoggedIn: false,
            errors:["Invalid password"],
            oldInput: {email: email},
            user: {},
        })
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    await req.session.save();

    res.redirect("/");
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(() => {
        res.redirect("/login");
    })
}