const fn = (args) => {
  console.log("123", this, args);
};
fn.apply({ name: 2 }, [1, 2, 3]);

// export {};
