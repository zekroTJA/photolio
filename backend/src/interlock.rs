use std::sync::Mutex;

pub struct Interlock<T> {
    result: Mutex<Option<T>>,
    waiting: Mutex<u32>,
}

impl<T> Interlock<T>
where
    T: Clone,
{
    pub fn new() -> Self {
        Interlock {
            result: Mutex::new(None),
            waiting: Mutex::new(0),
        }
    }

    pub fn get<F>(&self, f: F) -> T
    where
        F: Fn() -> T,
    {
        {
            let mut waiting = self.waiting.lock().unwrap();
            *waiting += 1;
        };

        {
            let mut val = self.result.lock().unwrap();
            let mut waiting = self.waiting.lock().unwrap();
            if let Some(res) = val.clone() {
                if *waiting == 1 {
                    *val = None;
                }
                *waiting -= 1;
                return res;
            }
        };

        let mut val = self.result.lock().unwrap();
        let retrieved = f();
        let mut waiting = self.waiting.lock().unwrap();
        if *waiting > 1 {
            *val = Some(retrieved.clone());
        }
        *waiting -= 1;

        retrieved
    }
}
