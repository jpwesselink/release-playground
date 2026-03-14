/// Greet someone by name, or return a generic greeting.
pub fn greet(name: Option<&str>) -> String {
    match name {
        Some(n) => format!("Hello, {n}! From release-playground-core."),
        None => "Hello from release-playground-core!".to_string(),
    }
}

/// Returns the version of the library.
pub fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
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
