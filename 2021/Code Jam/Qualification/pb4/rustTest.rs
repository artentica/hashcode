use std::{collections::HashSet, io::*, vec::*};

fn solve(_case_no: &usize, nb_elems: &usize, nb_questions: &usize){

    let mut ret: HashSet<usize> = HashSet::new();
    let mut i = 2usize;
    while i < nb_elems - 1 {
        println!("{} {} {}", i - 1, i, i + 1);
        i += 1;
    }
}

fn main() {
    let mut line = String::new();
    stdin().read_line(&mut line);
    let meta: Vec<usize> = line.trim().split_whitespace().map(|x| x.parse::<usize>().unwrap()).collect();
    let nb_tests = meta[0];
    let nb_elems = meta[1];
    let nb_questions = meta[2];
    let mut i = 0;
    while i < nb_tests {
        solve(&(&i + 1), &nb_elems, &nb_questions);
        i += 1;
    }
}
