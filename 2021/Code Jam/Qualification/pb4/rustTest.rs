use std::{collections::HashSet, io::*, vec::*};

fn dico(elem: &usize, vec: &mut Vec<usize>) {
    let mid = ((vec.len() / 2) as f64).floor() as usize;
    let mut line = String::new();
    println!("{} {} {}", (*vec)[0], *elem, (*vec)[mid]);
    stdin().read_line(&mut line);
    let med = line.trim().parse::<usize>().unwrap();
    match (med == (*vec)[0], med == *elem, med == (*vec)[mid]) {
        (true, false, false) => vec.insert(0, *elem),
        (false, true, false) => if mid == 1 {vec.insert(1, *elem);} else {dico(elem, &mut (*vec)[0..mid + 1].to_vec())},
        (false, false, true) => if mid == vec.len() - 1 {vec.insert(mid + 1, *elem)} else {dico(elem, &mut (*vec)[mid..].to_vec());},
        _ => println!("error"),
    };
}

fn solve(_case_no: &usize, nb_elems: &usize, nb_questions: &usize){
    let mut line = String::new();
    println!("1 2 3");
    stdin().read_line(&mut line);
    let index = line.trim();
    let mut ret: Vec<usize> = match index {
        "1" => vec![2, 1, 3],
        "2" => vec![1, 2, 3],
        "3" => vec![1, 3, 2],
        _ => vec![],
    };
    let mut i: usize = 4;
    while i <= *nb_elems {
        dico(&i, &mut ret);
        i += 1;
    }
    for e in ret.iter().enumerate() {
        print!("{}", e.1.to_string());
        if e.0 != ret.len() - 1 {print!(" ")}; 
    }
    println!("");
    line.clear();
    stdin().read_line(&mut line);
    match line.trim() {
        "1" => eprintln!("OK {:?}", ret),
        _ => eprintln!("Err {:?}", ret),
    };
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