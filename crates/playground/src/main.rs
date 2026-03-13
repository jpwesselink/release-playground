fn main() {
    println!("release-playground v{}", env!("CARGO_PKG_VERSION"));
    println!("{}", release_playground_lib::greet());
}
