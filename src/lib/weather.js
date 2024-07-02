export const weather = ({ name, weather }) => {
	return `
		<!DOCTYPE html>
		<html lang="ja">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Weather</title>
		</head>
		<body>
			<p>本日の ${name} の天気は ${weather[0].main} です</p>
		</body>
		</html>
	`
}
