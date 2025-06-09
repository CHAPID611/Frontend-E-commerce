import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/register", "./routes/auth/register.tsx"),
    route("/login", "./routes/auth/login.tsx"),
    route("/cart", "./routes/cart/cart.tsx"),

] satisfies RouteConfig;
