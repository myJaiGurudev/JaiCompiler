def getquantity():
    while True:
        try:
            quantity=int(input("How many do you want?:"))
            if quantity <=0:
                print("Quantity must be positive!")
            else:
                return quantity
        except ValueError:
            print("INVALID QUANTITY")

def display(cart):
    print("Cart Summary:")
    for item, quantity in cart.items():
        print(f"{item}: {quantity}")

def totalcost(cart,prices):
    total=0
    for item, quantity in cart.items():
        total+=quantity*prices[item]
    return total

def applydiscount(total):
    if total > 100:
        return total * 0.9
    return total

def checkout(cart,prices):
    display(cart)
    total=totalcost(cart,prices)
    print(f'{total} before Discount')
    total=applydiscount(total)
    print(f'{total} after Discount')
    return total    

def main():
    items=['Apples','Mosambi','Anar','Aam','Kela']
    prices={'Apples':20,'Mosambi':22.8,'Anar':33.5,'Aam':45.7,'Kela':50}
    print(prices)
    cart={}
    print("Welcome to shoppers stop, Select items")
    while True:
        for ele in items:
            print(ele)
        choice=input('enter item name or done if finished:').capitalize()
        if choice=="Done":
            break
        elif choice in items:
            quantity=getquantity()
            if choice in cart:
                cart[choice]=cart[choice]+quantity
                print(f'{choice} updated by {quantity}')
            else:
                cart[choice]=quantity
                print("Item added to the Cart")
    if cart:
        print(checkout(cart,prices))
    else:
        print('Empty cart')

main()
