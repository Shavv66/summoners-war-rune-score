﻿using SwrsServer.Components.Domain.Enumerations;

namespace SwrsServer.Components.Domain
{
	public class RuneStat : IComparable
	{
		public RuneStatType Type { get; private set; }
		public short Amount { get; private set; }

		public string TypeText => Type.ToDisplayString();
		public string AmountText => $"+{Amount}{(Type.IsPercentStat() ? "%" : "")}";

		public RuneStat(RuneStatType type, short amount)
		{
			Type = type;
			Amount = amount;
		}

		public RuneStat(List<short> statAsIntList) : this((RuneStatType)statAsIntList[0], statAsIntList[1]) { }

		public int CompareTo(object? other)
		{
			if (other is not RuneStat otherStat)
			{
				return 0;
			}

			if (Type != otherStat.Type)
			{
				return Type.ToString().CompareTo(otherStat.Type.ToString());
			}

			return Amount.CompareTo(otherStat.Amount);
		}

		public override string ToString()
		{
			if (Type == 0)
			{
				return "";
			}
			return $"{TypeText} {AmountText}";
		}
	}
}
