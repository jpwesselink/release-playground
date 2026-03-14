pub fn greet(name: Option<&str>) -> String {
    match name {
        Some(n) => format!("Hello, {n}! From release-playground-core."),
        None => "Hello from release-playground-core!".to_string(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert!(greet(None).contains("Hello"));
        assert!(greet(Some("World")).contains("World"));
    }
}
