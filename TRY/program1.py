n=int(input())
ev=0
od=0
i=1
if n>0 :
    while n>0:
        if i&1==0:
            ev+=n%10
        else:
            od+=n%10
        n//=10
        i+=1
    print(od-ev)
