from random import randint
import csv


if __name__ == '__main__':
	with open('data.tsv') as tsvfile:
		reader = csv.reader(tsvfile, delimiter='\t')
		L = list(reader)

	length = len(L)
	counter = 0
	D = {} 
	for i in L: 
		D[len(i)] = 1

	abstract = "" 
	while(counter < 71):
		while(True):
			index = randint(0, length - 1)
			if (L[index][counter] != "") :
				# print(L[index][counter]) + " "
				abstract += L[index][counter] + "/ "
				counter += 1
				break

	print(abstract)
