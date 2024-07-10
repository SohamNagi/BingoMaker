import random
import math

PLAYERS = 16
x = math.floor(math.sqrt(PLAYERS))
# Base list of question numbers
base_question_numbers = list(range(1, PLAYERS+1))

# Generate distinct random lists of question numbers
distinct_lists = []
while len(distinct_lists) < PLAYERS:
    random_list = random.sample(
        base_question_numbers, len(base_question_numbers))
    if random_list not in distinct_lists:
        distinct_lists.append(random_list)

# Output the distinct lists
# for i, lst in enumerate(distinct_lists):
#     print(f"List {i+1}")
#     for j in lst:
#         print(j)


# Base list of 25 follow-up question numbers
follow_up_question_numbers = list(range(1, PLAYERS+1))

# Function to create a unique bingo card with question numbers


def create_bingo_card(question_numbers):
    random.shuffle(question_numbers)
    return [question_numbers[i:i+x] for i in range(0, PLAYERS, x)]


# Generate 25 unique bingo cards with question numbers
bingo_cards = []
while len(bingo_cards) < PLAYERS:
    new_card = create_bingo_card(follow_up_question_numbers[:])
    if new_card not in bingo_cards:
        bingo_cards.append(new_card)

# Output the bingo cards
for i, card in enumerate(bingo_cards):
    print(f"Bingo Card {i+1}:")
    for row in card:
        NEW = 1
        while len(row) < x:
            Q = "q" + str(NEW)
            row.append(Q)
            NEW += 1
            random.shuffle(row)
        print(row)
    print()
