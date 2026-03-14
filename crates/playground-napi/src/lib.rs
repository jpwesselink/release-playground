use napi_derive::napi;

#[napi]
pub fn greet(name: Option<String>) -> String {
    release_playground_core::greet(name.as_deref())
}
