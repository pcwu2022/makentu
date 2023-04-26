# MakeNTU
## Protocol

通用：
1. class: UpperCaseCamel
2. variable or instance or function: camelCase
3. array: drugArr = []
4. object: drugObj = {}
5. bool: isSelected = false

## Login Page

## Main Page

### Interface

Login Page
```jsx
<div id = "root">
<Login>
    <Logo>
    <UsernameInput />
    <PasswordInput />
    <SubmitLoginButton />
</Login>
</div>
```

Main Page
```jsx
<div id = "root">   
<Main> 
    <PillGrid>
        <PillButton>
            <PillIconDisplay>
                <PillIcon />
                <PillIcon />
                <PillIcon />
            </PillIconDisplay>
        </PillButton>
        <PillButton />
        <PillButton />
    </PillGrid>
    <HealthDisplay>
        <HealthParameter type = "oxygen">
            <ParameterDisplay />
            <ParameterInput type = "lowerLimit" />
        </HealthParameter>
        <HealthParameter type = "heartrate">
            <ParameterDisplay />
            <ParameterInput type = "upperLimit" />
            <ParameterInput type = "lowerLimit" />
        </HealthParameter>
    </HealthDisplay>
</Main>
</div>
```

Add Pill
```jsx
<div id = "root">
<Add>
    <Input type = "pillName" />
    <Input type = "pillIcon" />
    <PillRemain>
        <Input type = "pillRemain" />
        <Input type = "pillRemainWarning" />
    </PillRemain>
    <PhotoDiscription>
        <Input type = "pillPhoto" />
        <Input type = "pillDescription">
    </PhotoDiscription>
    <PillTime>
        <SelectTime>
            <Input type = "selectTime" />
            <DoseButton type = "minus" />
            <Input type = "displayNumber" enable = false />
            <DoseButton type = "add" />
            <DeleteButton />
        </SelectTime>
        <SelectTime />
        <SelectTime />
        <NewTime />
    </PillTime>
    <SaveButton />
</Add>
</div>
```

Choose Icon
```jsx
<Choose>
<Shield>
    <IconGrid>
        <IconButton>
            <IconImage />
        </IconButton>
        <IconButton />
        <iconButton />
    </IconGrid>
</Shield>
</Choose>
```

### React
``` jsx

<SubmitLoginButton>.click -> submitLogin(<UsernameInput>.value, <PasswordInput>.value) -> true? <Main>.load() : alert("Unsuccessful")   

<PillButton>.click -> <Add>.load()

<Input.pillIcon>.click -> <Choose>.load()

<IconButton>.click -> <Choose>.close(IconButton.href)

<DoseButton>.click -> <DisplayNumber>.change

<SaveButton>.click -> foreach(setParameter(<Input>.type, <Input>.value))

```

### Variables


### Functions: Frontend

```js
Login.submitLogin(username, password) -> success

Main.load() -> {
    pillGridArr: [
        {
            pillName: "drug01",
            pillAmount: 5,
            pillIcon: "/drug5.png"
        },
        {},
        {}
    ],
    healthArr: {
        oxygen: 98,
        heartrate: 100
    },
    logArr: [
        "Added drug 'asfhkl' 10 pcs to the box at index 5",
        "",
        ""
    ]
}

Add.load() -> {
    pillName: "name",
    pilIcon: "/drug5.png",
    pillAmount: 5,
    pillDescription: "asdf",
    pillPhoto: "/asfhgskjl.png",
    timeArr: [
        {
            time: "10:00",
            dose: 1
        },
        {},
        {}
    ]
}

Choose.load() -> {
    [
        "/drug1.png",
        ""
    ]
}

Add.setParameter(type, value) -> null

```

### Functions: Backend


