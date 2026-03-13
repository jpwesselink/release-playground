pub fn greet() -> String {
    "Hello from release-playground-lib!".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert!(greet().contains("Hello"));
    }
}
