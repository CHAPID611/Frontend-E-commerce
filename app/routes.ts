import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/home", "./routes/home.tsx"),
    route("/auth/register", "./routes/auth/register.tsx"),
    route("/auth/login", "./routes/auth/login.tsx"),
    route("/cart", "./routes/cart/cart.tsx"),
    route("/admin/products", "./routes/admin/products.tsx"),
] satisfies RouteConfig;
