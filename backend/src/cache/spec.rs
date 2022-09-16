pub trait Cache<T> {
    fn get(&self, key: &str) -> Option<T>;
    fn set(&mut self, key: &str, val: &T);
}
