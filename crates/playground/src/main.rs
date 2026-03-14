fn main() {
    let name = std::env::args().nth(1);
    println!("release-playground v{}", env!("CARGO_PKG_VERSION"));
    println!("{}", release_playground_core::greet(name.as_deref()));
}
