import { Trophy, Gift } from 'lucide-react';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { weeklyWinners, getRewardHistory } from '../data/labour';
import { users } from '../data/users';

export default function Rewards() {
  const { auth } = useAuth();
  const { t } = useLang();
  const history = getRewardHistory(auth.employee?.id);

  function workerName(id: string) {
    return users.find(u => u.id === id)?.name ?? '—';
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <p className="text-sm text-gray-500">{t('rewardsIntro')}</p>

      {/* Weekly Rewards */}
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={18} className="text-amber-500" />
          <h3 className="text-sm font-semibold text-gray-700">🏆 {t('weeklyRewards')}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {weeklyWinners.map(w => {
            const isMe = w.workerId === auth.employee?.id;
            return (
              <div key={w.titleKey} className={`rounded-xl p-4 text-center border ${
                isMe ? 'bg-amber-50 border-amber-300' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="text-3xl mb-1">{w.emoji}</div>
                <p className="text-xs font-semibold text-gray-700">{t(w.titleKey)}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">{workerName(w.workerId)}</p>
                {isMe && <p className="text-[11px] text-amber-600 font-medium mt-1">{t('youWon')}</p>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* History */}
      <Card className="p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('history')}</h3>
        {history.length > 0 ? (
          <div className="space-y-2">
            {history.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Gift size={16} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t(item.labelKey)}</p>
                    <p className="text-xs text-gray-400">{t('giftReceived')} · {item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">{t('bonusAmount')}</p>
                  <p className="text-sm font-bold text-green-600">+₹{item.bonus.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-sm py-8">{t('noRewardsYet')}</p>
        )}
      </Card>
    </div>
  );
}
